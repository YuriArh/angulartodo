import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todos$ = new BehaviorSubject<Todo[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    if (text) {
      const newTodo: Todo = {
        text,
        isCompleted: false,
        id: Math.random().toString(16),
      };

      const updatedTodos = [...this.todos$.getValue(), newTodo];
      this.todos$.next(updatedTodos);
    }
  }

  toggleAll(isCompleted: boolean): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }

  changeFilter(filterName: FilterEnum): void {
    this.filter$.next(filterName);
  }

  changeTodo(id: string, text: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }
  removeTodo(id: string): void {
    const updatedTodos = this.todos$
      .getValue()
      .filter((todo) => todo.id !== id);
    this.todos$.next(updatedTodos);
  }

  toggleTodo(id: string): void {
    const updatedTodos = this.todos$.getValue().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    this.todos$.next(updatedTodos);
  }
}
