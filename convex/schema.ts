import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
  images: defineTable({
    fileName: v.string(),
    url: v.string(),
  }).index('by_filename', ['fileName']),
});

export default schema;
