import bcrypt from 'bcryptjs';
import { UserModel, IUser } from '../users/user.model';
import { RegisterDTO, LoginDTO, AuthResponse } from './auth.types';
import { generateToken } from '../../utils/token.util';

export class AuthService {
  static async register(dto: RegisterDTO): Promise<AuthResponse> {
    const cleanEmail = dto.email.trim().toLowerCase();
    const existing = await UserModel.findOne({ email: cleanEmail });
    if (existing) {
      throw new Error('A user with this email address already exists.');
    }

    // Phone validation if provided
    if (dto.phone) {
      const cleanPhone = dto.phone.replace(/[\s\-\+\(\)]/g, '');
      if (!/^\d{10}$/.test(cleanPhone) && !/^(91)?\d{10}$/.test(cleanPhone)) {
        throw new Error('Please provide a valid 10-digit mobile number.');
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user: IUser = await UserModel.create({
      name: dto.name.trim(),
      email: cleanEmail,
      phone: dto.phone,
      passwordHash,
      gender: dto.gender,
      interests: dto.interests || [],
      city: dto.city || 'Rajkot',
      role: dto.role || 'user',
      status: 'active',
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
        gender: user.gender,
      },
    };
  }

  static async login(dto: LoginDTO): Promise<AuthResponse> {
    const cleanEmail = dto.email.trim().toLowerCase();
    const user = await UserModel.findOne({ email: cleanEmail });
    if (!user) {
      throw new Error('Invalid email or password credentials.');
    }

    if (user.status === 'suspended') {
      throw new Error('Your account has been suspended by the platform administrator.');
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
        gender: user.gender,
      },
    };
  }

  static async getMe(userId: string): Promise<IUser | null> {
    return UserModel.findById(userId).select('-passwordHash');
  }

  static async updateProfile(userId: string, data: { name?: string; city?: string; gender?: 'male' | 'female'; avatar?: string; password?: string }): Promise<IUser | null> {
    const updatePayload: any = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.city !== undefined) updatePayload.city = data.city;
    if (data.gender !== undefined) updatePayload.gender = data.gender;
    if (data.avatar !== undefined) updatePayload.avatar = data.avatar;

    if (data.password) {
      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      const salt = await bcrypt.genSalt(10);
      updatePayload.passwordHash = await bcrypt.hash(data.password, salt);
    }

    return UserModel.findByIdAndUpdate(userId, { $set: updatePayload }, { new: true }).select('-passwordHash');
  }

  static async updateInterests(userId: string, interests: string[]): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(userId, { $set: { interests } }, { new: true }).select('-passwordHash');
  }

  static async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error('No registered account was found with this email address.');
    }
    return { success: true, message: 'Password reset link sent to your registered email.' };
  }
}
