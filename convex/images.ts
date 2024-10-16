import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const createImage = mutation({
  args: {
    fileName: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const image = await ctx.db.insert('images', {
        fileName: args.fileName,
        url: args.url,
      });

      return image;
    } catch (err) {
      console.log(err);
    }
  },
});

export const getImages = query(async (ctx) => {
  try {
    const images = await ctx.db.query('images').collect();

    return images;
  } catch (err) {
    console.log(err);
  }
});
