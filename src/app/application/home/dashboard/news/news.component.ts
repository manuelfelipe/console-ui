import { Component, OnInit } from '@angular/core';
import { News } from '../../../../shared/news/news';
import { NewsService } from '../../../../shared/news/news.service';
import { NewsRequestFactory } from '../../../../shared/news/news-request.factory';
import { NewsResponseFactory } from '../../../../shared/news/news-response.factory';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  recentNews: News[] = [];
  isLoading = false;

  // used in html only
  collapseStates: { [key: string]: boolean } = {};

  constructor(private newsService: NewsService,
              private newsRequestFactory: NewsRequestFactory,
              private newsResponseFactory: NewsResponseFactory) {
  }

  ngOnInit() {
    const request = this.newsRequestFactory.toGetNewsRequest(null);

    this.isLoading = true;
    this.newsService.getNews(request).first()
      .map(response => this.newsResponseFactory.toManyNews(response))
      .finally(() => this.isLoading = false)
      .subscribe(news => this.recentNews = news.sort(this.newsDateComparator));
  }

  private newsDateComparator(n1: News, n2: News) {
    const n1Date = new Date(n1.createdAt);
    const n2Date = new Date(n2.createdAt);

    return (n1Date < n2Date) ? 1 : -1;
  }
}
