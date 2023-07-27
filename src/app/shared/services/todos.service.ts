import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';
import { Todos } from '../interfaces/todos-models';

@Injectable()
export class TodosService {
  baseUrl: string = '';

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService
  ) {
    this.baseUrl = this.settingsService.settings.baseUrl;
  }

  mutateTodo(todo: Todos, mutatedTodo: Todos): Observable<Todos> {
    const { id } = todo;
    const apiEndPoint = `${this.baseUrl}/todos/${id}`;
    return this.http.put<Todos>(apiEndPoint, mutatedTodo);
  }

  deleteTodo(todo: Todos): Observable<Todos> {
    const { id } = todo;
    const apiEndPoint = `${this.baseUrl}/todos/${id}`;
    return this.http.delete<Todos>(apiEndPoint);
  }

  getTodos(): Observable<Todos[]> {
    const apiEndpoint = `${this.baseUrl}/todos`;
    return this.http.get<Todos[]>(apiEndpoint);
  }

  addTodo(todo: Todos): Observable<Todos> {
    const apiEndpoint = `${this.baseUrl}/todos`;
    return this.http.post<Todos>(apiEndpoint, todo);
  }

  updateTodo(todo: Todos): Observable<Todos> {
    const { id } = todo;
    const apiEndpoint = `${this.baseUrl}/todos/${id}`;
    return this.http.put<Todos>(apiEndpoint, todo);
  }
}
