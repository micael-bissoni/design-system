import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridComponent } from './data-grid.component';
import { type DataGridRecord } from './data-grid.types';

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  const mockData: DataGridRecord[] = [
    { id: '1', nome: 'Item 1', pais: 'PT', dataInicio: '2021-01-01', dataFim: '2021-12-31', estado: 'Ativo' },
    { id: '2', nome: 'Item 2', pais: 'ES', dataInicio: '2021-01-01', dataFim: '2021-12-31', estado: 'Pendente' },
    { id: '3', nome: 'Item 3', pais: 'FR', dataInicio: '2021-01-01', dataFim: '2021-12-31', estado: 'Cancelado' },
  ];

  const mockColumns = [
    { id: 'id', label: 'ID', key: 'id', width: '100px' },
    { id: 'nome', label: 'Nome', key: 'nome', width: '1fr' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Data Grid');
    fixture.componentRef.setInput('data', mockData);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toBe('Test Data Grid');
  });

  it('should emit the search term when onSearch is called', () => {
    const searchSpy = vi.spyOn(component.searchChange, 'emit');
    component.onSearch('Item 2');
    expect(searchSpy).toHaveBeenCalledWith('Item 2');
    expect(component.page()).toBe(0);
  });

  it('should calculate page range correctly', () => {
    expect(component.pageRange()).toBe('1 - 3 de 3');
  });

  it('should navigate pages when clicking next/prev', () => {
    fixture.componentRef.setInput('pageSize', 1);
    fixture.detectChanges();
    expect(component.pageRange()).toBe('1 - 1 de 3');
    component.nextPage();
    fixture.detectChanges();
    expect(component.pageRange()).toBe('2 - 2 de 3');
  });
});
