import { job } from './../../datatypes';
import { Component } from '@angular/core';
import { JobService } from './job.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'dcipertask';

  selectedRole = '';
  selectedTechnology='';
  selectedExperience = '';
  selectedCTC= '';
  

  data: job[] = [];
  filteredJobs: job[] = [];

    constructor(private jobservice: JobService) {}

   
    modifyTechnology(technology: string[] | undefined): string {
      // Check if technology is undefined or an empty array, and return an empty string if it is
      if (!technology || technology.length === 0) {
        return '';
      }
      // Join the array elements using hyphen 
      return technology.join('-');
    }



    ngOnInit(): void {
    this.jobservice.getJobs().subscribe((data) => {
      this.data = data;
      console.log('@@@ - Init Function Called', this.data);
      // Initialize filteredJobs with all jobs
      this.filteredJobs = this.data; 
    });
    this.refreshJobs();
  }



  onFilterChange(filterType: string, filterValue: string): void {
    console.log('@@@ - Selected Filter :', filterType, filterValue);
    switch (filterType) {
      case 'role':
      case 'technology':
      case 'experience':
      case 'contract':
      case 'location':
      case 'ctc':
        this.filteredJobs = this.data.filter(
          (job) => job[filterType] === filterValue
        );
        break;
      default:
        // For the title filter
        if (filterValue) {
          this.filteredJobs = this.data.filter((job) =>
            job.title.includes(filterValue)
          );
        } else {
          // If no filter selected, show all jobs
          this.filteredJobs = this.data;
        }
        break;
    }
    this.refreshJobs(filterType, filterValue);
  }




  private refreshJobs(filterType?: string, filterValue?: string): void {
    console.log('@@@ - I am in Refresh Jobs');
    this.jobservice.getJobs().subscribe((data) => {
      console.log('Data from API Service Call:', data);
      this.data = data || [];
      if (filterType === 'title' && filterValue) {
        this.filteredJobs = this.data.filter((job) =>
          job.title.toLowerCase().includes(filterValue.toLowerCase())
        );
        console.log('@@@ - Success Data');
      }
      });
  }
}
