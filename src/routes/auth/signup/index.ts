import { db } from '$lib/database';
import type { RequestHandler } from "@sveltejs/kit";
import * as bcrypt from 'bcrypt';


export const POST: RequestHandler = async ({request}) => {
  const form = await request.formData();
  const email = form.get('mail');
  const password = form.get('password');
  const passwordrp = form.get('passwordrp');
  
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { 
      status: 400,
      body: {error: 'Invalid input, please check your input and try again.'}
    };
  }

  if (password.length < 8) {
    return { 
      status: 400,
      body: {error: 'Password must be at least 8 characters long.'}
    };
  }

  if (!password || !passwordrp || !email) {
    return { 
      status: 400,
      body: {error: 'Invalid input, please check your input and try again.'}
    };
  }

  if (password !== passwordrp) {
    return {
      status: 400,
      body: {error: 'Your passwords do not match'}
    }
  }

  try {
    await db.user.create({
      data: {
        email,
        passwordHash: await bcrypt.hash(password, 10),
      }
    });
    return {
      status: 200,
      body: {success: 'You have successfully signed up'}
    }
  } catch (error) {
    return {
      status: 400,
      body: {error: 'An User with this E-Mail allready exists'}
    }
  }

}