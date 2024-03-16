import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ApiRequestsService} from "../shared/api-requests.service";
import {Article} from "../shared/article";
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {

  id: string = '';
  article!: Article;
  form = new FormGroup({
    titleControl: new FormControl<string>(''),
    sourceControl: new FormControl<string>(''),
    linkControl: new FormControl<string>(''),
    summaryControl: new FormControl<string>(''),
    languageControl: new FormControl<string>(''),
    topicControl: new FormControl<string>(''),
  });

  constructor(
    private route: ActivatedRoute,
    private as: ApiRequestsService,
    private location: Location,
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
            titleControl: this.article?.title,
            sourceControl: this.article?.source,
            linkControl: this.article?.link,
            summaryControl: this.article?.summary,
            languageControl: this.article?.language,
            topicControl: this.article?.topic,
          })
          return this.article;
        },
        error: (err) => console.log(err),
        complete: () => console.log('getOne() completed')
      });
  }

  cancel(): void {
    this.location.back();
  }

}
