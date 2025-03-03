import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb'; // Ensure correct import

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>, // Use MongoRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User | null> {
    const objectId = new ObjectId(id); // Convert string to ObjectId

    const user = await this.userRepository.findOneBy({
      _id: objectId, // Use `_id` here
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    const objectId = new ObjectId(id); // Convert string to ObjectId

    // Find the user by ID
    const user = await this.userRepository.findOneBy({ _id: objectId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Merge the updateData into the existing user object
    const updatedUser = this.userRepository.merge(user, updateData);

    // Save the updated user
    return await this.userRepository.save(updatedUser);
  }

  async deleteUser(id: string): Promise<boolean> {
    const objectId = new ObjectId(id); // Convert string to ObjectId

    const result = await this.userRepository.delete({ id: objectId }); // Use `_id` here

    return result.affected ? result.affected > 0 : false;
  }
}
