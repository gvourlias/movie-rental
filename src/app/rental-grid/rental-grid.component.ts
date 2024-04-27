import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IRental, RentalQueryRequest } from '@models';
import { RentalService } from 'src/domain/services/rental/rental.service';

@Component({
  selector: 'app-rental-grid',
  templateUrl: './rental-grid.component.html',
  styleUrls: ['./rental-grid.component.scss'],
})
export class RentalGridComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'uuid',
    'rentalDate',
    'returnDate',
    'isPaid',
    'movie',
    'cost',
  ];
  dataSource: MatTableDataSource<IRental>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private rentalService: RentalService) {
    const userRentals: any = [];
    this.dataSource = new MatTableDataSource(userRentals);
  }

  ngOnInit(): void {
    const request = new RentalQueryRequest();
    request.page = 1;
    request.page_size = 100;
    this.rentalService.getUserRentals(request).subscribe((response) => {
      this.dataSource.data = response.results;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
