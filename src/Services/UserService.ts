import { UserAttributes } from '@/Entities/User';
import client from '@/Config/Database.Config';
import { types } from 'cassandra-driver';
import { v4 as uuidv4 } from 'uuid';

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
}

export class UserService {
  async getAllUsers(): Promise<UserAttributes[]> {
    try {
      const query = 'SELECT id, email, first_name, last_name, created_at, updated_at FROM users';
      const result = await client.execute(query);

      return result.rows.map((row) => ({
        id: row.id.toString(),
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } catch (error) {
      console.error('[ERROR] Error fetching users:', error);
      throw new Error('Error fetching users');
    }
  }

  async getUserById(id: string): Promise<UserAttributes | null> {
    try {
      const query =
        'SELECT id, email, first_name, last_name, created_at, updated_at FROM users WHERE id = ?';
      const result = await client.execute(query, [types.Uuid.fromString(id)], { prepare: true });

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        id: row.id.toString(),
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      };
    } catch (error) {
      console.error('[ERROR] Error fetching user:', error);
      throw new Error('Error fetching user');
    }
  }

  async createUser(userData: CreateUserDto): Promise<UserAttributes> {
    try {
      const id = uuidv4();
      const now = new Date();

      const query = `
        INSERT INTO users (id, email, first_name, last_name, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      await client.execute(
        query,
        [
          types.Uuid.fromString(id),
          userData.email,
          userData.firstName,
          userData.lastName,
          now,
          now,
        ],
        { prepare: true }
      );

      return {
        id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        createdAt: now,
        updatedAt: now,
      };
    } catch (error) {
      console.error('[ERROR] Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

  async updateUser(id: string, userData: Partial<CreateUserDto>): Promise<UserAttributes | null> {
    try {
      // First check if user exists
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        return null;
      }

      const now = new Date();
      const updates: string[] = [];
      const params: (string | Date | types.Uuid)[] = [];

      if (userData.email !== undefined) {
        updates.push('email = ?');
        params.push(userData.email);
      }
      if (userData.firstName !== undefined) {
        updates.push('first_name = ?');
        params.push(userData.firstName);
      }
      if (userData.lastName !== undefined) {
        updates.push('last_name = ?');
        params.push(userData.lastName);
      }

      updates.push('updated_at = ?');
      params.push(now);

      // Add id as the last parameter
      params.push(types.Uuid.fromString(id));

      const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
      await client.execute(query, params, { prepare: true });

      // Return updated user
      return await this.getUserById(id);
    } catch (error) {
      console.error('[ERROR] Error updating user:', error);
      throw new Error('Error updating user');
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      // First check if user exists
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        return false;
      }

      const query = 'DELETE FROM users WHERE id = ?';
      await client.execute(query, [types.Uuid.fromString(id)], { prepare: true });
      return true;
    } catch (error) {
      console.error('[ERROR] Error deleting user:', error);
      throw new Error('Error deleting user');
    }
  }
}
