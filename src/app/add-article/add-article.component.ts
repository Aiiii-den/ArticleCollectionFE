import {Component} from '@angular/core';
import {Article} from "../shared/article";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiRequestsService} from "../shared/api-requests.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent {

  id: string = '';
  article: Article = {
    _id: '',
    title: '',
    source: '',
    link: '',
    summary: '',
    language: '',
    topic: ''
  };
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
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit(): void {
  }

  save(): void {
    const values = this.form.value;
    this.article.title = values.titleControl!;
    this.article.source = values.sourceControl!;
    this.article.link = values.linkControl!;
    this.article.summary = values.summaryControl!;
    this.article.topic = values.topicControl!;
    this.article.language = values.languageControl!;
    this.as.addEntry(this.article)
      .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            console.log('save() completed');
            this.router.navigateByUrl('/overview');
          }
        }
      );

  }

  cancel(): void {
    this.location.back();
  }


}
