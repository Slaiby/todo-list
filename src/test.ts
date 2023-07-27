import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Import your spec files here
import './app/todos/todos-display/todos-display.component.spec';
import './app/todos/todo-population-form/todo-population-form.spec';
import './app/todos/todos-landing/todos-landing.component.spec';
