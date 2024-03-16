import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ApiRequestsService} from "../shared/api-requests.service";
import {Article} from "../shared/article";

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  id: string = '';
  article!: Article;
  form = new FormGroup({
    title: new FormControl<string>(''),
    source: new FormControl<string>(''),
    link: new FormControl<string>(''),
    summary: new FormControl<string>(''),
    language: new FormControl<string>(''),
    topic: new FormControl<string>(''),
  });

  constructor(
    private route: ActivatedRoute,
    private as: ApiRequestsService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getOneByID(this.id);
  }

  getOneByID(id: string): void {
    this.as.getEntryByID(id).subscribe(
      {
        next: (response) => {
          this.article = response;
          console.log('article', this.article);
          this.form.patchValue({
            title: this.article?.title,
            source: this.article?.source,
            link: this.article?.link,
            summary: this.article?.summary,
            language: this.article?.language,
            topic: this.article?.topic,
          })
          return this.article;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getOne() completed')
      });
  }

  update(): void {

  }

  cancel(): void {

  }

}
