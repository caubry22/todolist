import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) { }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.save(createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    try {
      await this.todoRepository.update(id, updateTodoDto);
      return this.todoRepository.findOne({
        where: { id }
      })
    } catch (error) {
      return error;
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return this.todoRepository.delete(id);
    } catch (error) {
      return error;
    }
  }
}
