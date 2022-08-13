import { db } from '$lib/database';
import type { RequestHandler } from "@sveltejs/kit";
import * as bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({request}) => {
  const form = await request.formData();
  const oldpassword = form.get('oldpassword');
  const newpassword = form.get('newpassword');
  const newpasswordrp = form.get('newpasswordrp');
  const email = form.get('mail');

  if (typeof oldpassword !== 'string' || typeof newpassword !== 'string' || typeof newpasswordrp !== 'string' || typeof email !== 'string') {
    return { 
      status: 400,
      body: {error: 'Invalid input, please check your input and try again.'}
    };
  }
  if (!oldpassword || !newpassword || !newpasswordrp || !email) {
    return {
      status: 400,
      body: {error: 'You have to provide an old and a new password'}
    }
  }
  if (newpassword !== newpasswordrp) {
    return {
      status: 400,
      body: {error: 'Your new passwords do not match'}
    }
  }
  const user = await db.user.findUnique({
    where: {email}
  })
  const passwordMatch = user && await bcrypt.compare(oldpassword, user.passwordHash)

  if (!passwordMatch) {
    return {
      status: 400,
      body: {error: 'Your old password is invalid'}
    }
  }
  try {
    await db.user.update({
      where: {email},
      data: {
        passwordHash: await bcrypt.hash(newpassword, 10),
      }
    })
  } catch (error) {
    console.log(error)
    return {
      status: 400,
      body: {error: 'smth went wrong'}
    }
  }
  return {
    status: 200,
    body: {
      success: 'You have successfully changed your password',
    }
  }
}