import bcrypt from 'bcryptjs';
import { UserModel, IUser } from '../users/user.model';
import { RegisterDTO, LoginDTO, AuthResponse } from './auth.types';
import { generateToken } from '../../utils/token.util';

export class AuthService {
  static async register(dto: RegisterDTO): Promise<AuthResponse> {
    const existing = await UserModel.findOne({ email: dto.email });
    if (existing) {
      throw new Error('A user with this email address already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user: IUser = await UserModel.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      gender: dto.gender,
      interests: dto.interests || [],
      role: dto.role || 'user',
    });

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  static async login(dto: LoginDTO): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email: dto.email });
    if (!user) {
      throw new Error('Invalid email or password credentials.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password credentials.');
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  static async getMe(userId: string): Promise<IUser | null> {
    return UserModel.findById(userId).select('-passwordHash');
  }

  static async updateProfile(userId: string, data: { name?: string; city?: string; gender?: 'male' | 'female'; avatar?: string }): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(userId, { $set: data }, { new: true }).select('-passwordHash');
  }

  static async updateInterests(userId: string, interests: string[]): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(userId, { $set: { interests } }, { new: true }).select('-passwordHash');
  }

  static async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      // Return success to avoid email enumeration
      return { success: true, message: 'If an account exists, a password reset link has been dispatched.' };
    }
    // Simulation for reset link dispatch
    return { success: true, message: 'Password reset link sent to your registered email.' };
  }
}
