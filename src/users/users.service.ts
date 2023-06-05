import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private UserSchema: mongoose.Model<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    let existingUser = await this.UserSchema.findOne({
      email: user.email,
    });

    if (existingUser) {
      throw new HttpException(
        {
          property: 'email',
          message: 'User with given email ID already exist',
        },
        HttpStatus.CONFLICT,
      );
    }
    existingUser = await this.UserSchema.findOne({
      phoneNumber: user.phoneNumber,
    });

    if (existingUser) {
      throw new HttpException(
        {
          property: 'phoneNumber',
          message: 'User with given phone number already exist',
        },
        HttpStatus.CONFLICT,
      );
    }
    return await this.UserSchema.create(user);
  }

  async findAll(query: Query) {
    const pageNo = Number(query?.pageNo) || 1;
    const pageSize = Number(query?.pageSize) || 4;
    const { firstName, lastName, email, phoneNumber, companyName, userState } =
      query;

    let users = undefined;
    users = await this.UserSchema.aggregate([
      {
        $match: {
          firstName: { $regex: firstName || '', $options: 'i' },
          lastName: { $regex: lastName || '', $options: 'i' },
          email: { $regex: email || '', $options: 'i' },
          phoneNumber: { $regex: phoneNumber || '', $options: 'i' },
          companyName: { $regex: companyName || '', $options: 'i' },
          userState: { $regex: userState || '' },
        },
      },
      {
        $facet: {
          data: [
            { $sort: { _id: -1 } },
            { $skip: (pageNo - 1) * pageSize },
            { $limit: pageSize },
          ],
          count: [{ $count: 'count' }],
        },
      },
    ]);

    if (users[0].data.length == 0)
      return {
        content: [],
        pagesize: 0,
        pageno: 0,
        count: 0,
        totalPages: 0,
        domain: 'Users',
      };

    const count = users[0].count[0].count;
    return {
      content: users[0].data,
      pagesize: pageSize,
      pageno: pageNo,
      count,
      totalPages: Math.ceil(count / pageSize),
      domain: 'Users',
    };
  }

  async update(id: string, updateUser: UpdateUserDto) {
    const userId = id;
    const user = await this.UserSchema.findById(userId);

    if (user) {
      const { email, phoneNumber } = updateUser;
      const existingUser = await this.UserSchema.findOne({
        $or: [{ email }, { phoneNumber }],
      })
        .where('_id')
        .ne(userId)
        .select({
          email: 1,
          phoneNumber: 1,
        });

      if (existingUser) {
        if (existingUser.email === email) {
          throw new HttpException(
            {
              property: 'emial',
              message: 'User with given email ID already exist',
            },
            HttpStatus.CONFLICT,
          );
        }

        if (existingUser.phoneNumber === phoneNumber) {
          throw new HttpException(
            {
              property: 'phoneNumber',
              message: 'User with given phone number already exist',
            },
            HttpStatus.CONFLICT,
          );
        }
      }
      return await user.set(updateUser).save();
    } else {
      throw new HttpException(
        'User with given ID not found',
        HttpStatus.CONFLICT,
      );
    }
  }

  async remove(id: string) {
    const removed = await this.UserSchema.findByIdAndDelete(id);
    if (!removed)
      throw new HttpException(
        'User with given ID not found',
        HttpStatus.NOT_FOUND,
      );

    return removed;
  }
}
