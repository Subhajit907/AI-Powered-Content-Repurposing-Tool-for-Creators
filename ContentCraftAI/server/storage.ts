import { 
  User, InsertUser, 
  Video, InsertVideo,
  GeneratedContent, InsertGeneratedContent,
  users, videos, generatedContents
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Keep the IStorage interface the same
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Video methods
  getVideo(id: number): Promise<Video | undefined>;
  createVideo(video: Omit<InsertVideo, "createdAt">): Promise<Video>;
  
  // Generated content methods
  getGeneratedContent(id: number): Promise<GeneratedContent | undefined>;
  getGeneratedContentByVideoId(videoId: number): Promise<GeneratedContent[]>;
  createGeneratedContent(content: Omit<InsertGeneratedContent, "createdAt">): Promise<GeneratedContent>;
}

// Replace MemStorage with DatabaseStorage
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Video methods
  async getVideo(id: number): Promise<Video | undefined> {
    const [video] = await db.select().from(videos).where(eq(videos.id, id));
    return video || undefined;
  }
  
  async createVideo(insertVideo: Omit<InsertVideo, "createdAt">): Promise<Video> {
    const now = new Date().toISOString();
    const [video] = await db
      .insert(videos)
      .values({
        ...insertVideo,
        status: "completed",
        createdAt: now
      })
      .returning();
    return video;
  }
  
  // Generated content methods
  async getGeneratedContent(id: number): Promise<GeneratedContent | undefined> {
    const [content] = await db.select().from(generatedContents).where(eq(generatedContents.id, id));
    return content || undefined;
  }
  
  async getGeneratedContentByVideoId(videoId: number): Promise<GeneratedContent[]> {
    return await db.select().from(generatedContents).where(eq(generatedContents.videoId, videoId));
  }
  
  async createGeneratedContent(insertContent: Omit<InsertGeneratedContent, "createdAt">): Promise<GeneratedContent> {
    const now = new Date().toISOString();
    const [content] = await db
      .insert(generatedContents)
      .values({
        ...insertContent,
        createdAt: now
      })
      .returning();
    return content;
  }
}

export const storage = new DatabaseStorage();
