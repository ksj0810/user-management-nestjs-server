import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { regularExp } from 'config/regularExp';
import { RESPONSE } from 'config/response.utils';
import { PostSignInRequest } from '../auth/dto/request/post-sign-in.request';
import { PostSignUpRequest } from '../auth/dto/request/post-sign-up.request';
import { PatchAuthInfoRequest } from '../auth/dto/request/patch-auth-info.request';
import { PostSearchEmailRequest } from '../auth/dto/request/post-search-email.request';
import { PatchPasswordRequest } from '../auth/dto/request/patch-password.request';

// Auth관련 데코레이터

export const User = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<import('express').Request>();
    return req.user;
  },
);

export const PostSignIn = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const postSignInBodyData: PostSignInRequest = ctx
      .switchToHttp()
      .getRequest().body;
    if (!postSignInBodyData.email) {
      throw new HttpException(RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp.emailRegex.test(postSignInBodyData.email)) {
      throw new HttpException(RESPONSE.INVALID_EMAIL, 201);
    }
    if (!postSignInBodyData.password) {
      throw new HttpException(RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(postSignInBodyData.password)) {
      throw new HttpException(RESPONSE.INVALID_PASSWORD, 201);
    }
    return postSignInBodyData;
  },
);

export const PostSignUp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const postSignUpBodyData: PostSignUpRequest = ctx
      .switchToHttp()
      .getRequest().body;
    if (!postSignUpBodyData.email) {
      throw new HttpException(RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp.emailRegex.test(postSignUpBodyData.email)) {
      throw new HttpException(RESPONSE.INVALID_EMAIL, 201);
    }
    if (!postSignUpBodyData.password) {
      throw new HttpException(RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(postSignUpBodyData.password)) {
      throw new HttpException(RESPONSE.INVALID_PASSWORD, 201);
    }
    if (!postSignUpBodyData.confirmPassword) {
      throw new HttpException(RESPONSE.EMPTY_CONFIRM_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(postSignUpBodyData.confirmPassword)) {
      throw new HttpException(RESPONSE.INVALID_CONFIRM_PASSWORD, 201);
    }
    if (postSignUpBodyData.password !== postSignUpBodyData.confirmPassword) {
      throw new HttpException(RESPONSE.NOT_MATCH_CONFIRM_PASSWORD, 201);
    }
    if (!postSignUpBodyData.phoneNumber) {
      throw new HttpException(RESPONSE.EMPTY_PHONE_NUMBER, 201);
    }
    if (!regularExp.phoneNumberRegex.test(postSignUpBodyData.phoneNumber)) {
      throw new HttpException(RESPONSE.INVALID_PHONE_NUMBER, 201);
    }
    if (!postSignUpBodyData.nickname) {
      throw new HttpException(RESPONSE.EMPTY_NICKNAME, 201);
    }
    if (postSignUpBodyData.nickname.length > 20) {
      throw new HttpException(RESPONSE.INVALID_NICKNAME, 201);
    }
    return postSignUpBodyData;
  },
);

export const PatchAuthInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const patchAuthInfoBodyData: PatchAuthInfoRequest = ctx
      .switchToHttp()
      .getRequest().body;
    if (!patchAuthInfoBodyData.nickname) {
      throw new HttpException(RESPONSE.EMPTY_NICKNAME, 201);
    }
    if (patchAuthInfoBodyData.nickname.length > 20) {
      throw new HttpException(RESPONSE.INVALID_NICKNAME, 201);
    }
    return patchAuthInfoBodyData;
  },
);

export const PostSearchEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const postSearchEmailBodyData: PostSearchEmailRequest = ctx
      .switchToHttp()
      .getRequest().body;
    if (!postSearchEmailBodyData.phoneNumber) {
      throw new HttpException(RESPONSE.EMPTY_PHONE_NUMBER, 201);
    }
    if (
      !regularExp.phoneNumberRegex.test(postSearchEmailBodyData.phoneNumber)
    ) {
      throw new HttpException(RESPONSE.INVALID_PHONE_NUMBER, 201);
    }
    return postSearchEmailBodyData;
  },
);

export const PatchPassword = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const patchPasswordBodyData: PatchPasswordRequest = ctx
      .switchToHttp()
      .getRequest().body;
    if (!patchPasswordBodyData.email) {
      throw new HttpException(RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp.emailRegex.test(patchPasswordBodyData.email)) {
      throw new HttpException(RESPONSE.INVALID_EMAIL, 201);
    }
    if (!patchPasswordBodyData.password) {
      throw new HttpException(RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(patchPasswordBodyData.password)) {
      throw new HttpException(RESPONSE.INVALID_PASSWORD, 201);
    }
    if (!patchPasswordBodyData.confirmPassword) {
      throw new HttpException(RESPONSE.EMPTY_CONFIRM_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(patchPasswordBodyData.confirmPassword)) {
      throw new HttpException(RESPONSE.INVALID_CONFIRM_PASSWORD, 201);
    }
    if (
      patchPasswordBodyData.password !== patchPasswordBodyData.confirmPassword
    ) {
      throw new HttpException(RESPONSE.NOT_MATCH_CONFIRM_PASSWORD, 201);
    }
    if (!patchPasswordBodyData.phoneNumber) {
      throw new HttpException(RESPONSE.EMPTY_PHONE_NUMBER, 201);
    }
    if (!regularExp.phoneNumberRegex.test(patchPasswordBodyData.phoneNumber)) {
      throw new HttpException(RESPONSE.INVALID_PHONE_NUMBER, 201);
    }
    return patchPasswordBodyData;
  },
);
