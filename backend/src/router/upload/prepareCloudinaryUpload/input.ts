import z from 'zod';
import { getKeysAsArray } from '@authwithback/shared/src/getKeysAsArray';
import { cloudinaryUploadTypes } from '@authwithback/shared/src/cloudinary';

export const zPrepareCloudinaryUploadTrpcInput = z.object({
  type: z.enum(getKeysAsArray(cloudinaryUploadTypes)),
});
