import {Component, OnInit} from '@angular/core';
import {Article} from "../shared/article";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiRequestsService} from "../shared/api-requests.service";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

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
    private router: Router
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

  update(): void {
    const values = this.form.value;
    this.article.title = values.titleControl!;
    this.article.source = values.sourceControl!;
    this.article.link = values.linkControl!;
    this.article.summary = values.summaryControl!;
    this.article.topic = values.topicControl!;
    this.article.language = values.languageControl!;
    this.as.updateEntryByID(this.id, this.article)
      .subscribe({
          next: (response) => {
            console.log(response);
            console.log(response._id);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('update() completed');
            this.router.navigateByUrl('/overview')
          }
        }
      );

  }


}
