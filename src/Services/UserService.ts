import { User } from '@/Entities/User';

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
}

export class UserService {
  async getAllUsers(): Promise<User[]> {
    try {
      return await User.findAll();
    } catch (error) {
      console.error('[ERROR] Error fetching users:', error);
      throw new Error('Error fetching users');
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      return await User.findByPk(id);
    } catch (error) {
      console.error('[ERROR] Error fetching user:', error);
      throw new Error('Error fetching user');
    }
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    try {
      return await User.create(userData);
    } catch (error) {
      console.error('[ERROR] Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

  async updateUser(id: number, userData: Partial<CreateUserDto>): Promise<User | null> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return null;
      }
      return await user.update(userData);
    } catch (error) {
      console.error('[ERROR] Error updating user:', error);
      throw new Error('Error updating user');
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return false;
      }
      await user.destroy();
      return true;
    } catch (error) {
      console.error('[ERROR] Error deleting user:', error);
      throw new Error('Error deleting user');
    }
  }
}
