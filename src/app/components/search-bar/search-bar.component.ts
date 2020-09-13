import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchInput = new FormControl(''); // Control for the input
  hasError: string = null; // Error message

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe(query => {
      if (query.search_query) {
        this.searchInput.setValue(query.search_query.replace(/-/g, ' '));
      }
    });
  }

  ngOnInit(): void {
    this.searchInput.valueChanges.subscribe(text => {
      // Validation no special characters are in the search
      const characters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (characters.test(text)) {
        // Error message
        this.hasError = 'No se permiten caracteres especiales.';
      }
      else {
        this.hasError = null;
      }
    });
  }

  search() {
    // Query with leading and trailing spaces removed, lowercased and with spaces replaced with "_"
    const query = this.searchInput.value.trim().replace(/\s+/g, '-').toLowerCase();
    if (!this.hasError) {
      // Send to the search page with the query
      this.router.navigate(['/search'], { queryParams: { search_query: query } });
    }
  }

}
