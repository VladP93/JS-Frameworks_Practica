import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ArticleService],
})
export class HomeComponent implements OnInit {
  public title: string;
  public articles: Article;

  constructor(private _articleServices: ArticleService) {
    this.title = 'Últimos artículos';
  }

  ngOnInit(): void {
    this._articleServices.getArticles(true).subscribe((response) => {
      response.articles && (this.articles = response.articles);
    }),
      (error) => {
        console.log(error);
      };
  }
}
