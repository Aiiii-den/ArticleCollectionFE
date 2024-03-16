import {Component, OnInit} from '@angular/core';
import {ApiRequestsService} from "../shared/api-requests.service";
import {Article} from "../shared/article";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{
  articles!: Article[];
  selectedLanguage: string[] = [];
  selectedTopic: string[] = [];

  constructor(private ar: ApiRequestsService) {
  }

  ngOnInit(): void {
    this.readAll();
  }

  readAll(): void {
    this.ar.getAllEntries().subscribe(
      {
        next: (response) => {
          this.articles = response;
          console.log(this.articles);
          return this.articles;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getAll() completed')
      })
  }

  filterArticles(): void {
    // Pass searchQuery to service method for filtering
    this.ar.getFilteredEntries(this.selectedLanguage,this.selectedTopic, ).subscribe({
      next: (response) => {
        this.articles = response;
        console.log(this.articles);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Filtering completed')
    });
  }

  deleteArticle(id: string): void {
    // Call the service's delete method
    this.ar.deleteEntryByID(id).subscribe({
      next: () => {
        // If deletion is successful, remove the article from the local array
        this.articles = this.articles.filter(article => article._id !== id);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Article deleted')
    });
  }
}
