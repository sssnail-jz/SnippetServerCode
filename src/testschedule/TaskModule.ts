import { Module } from "@nestjs/common";
import { TaskService } from "./TaskService";

@Module({
  providers: [TaskService],
})

export class TaskModule{}