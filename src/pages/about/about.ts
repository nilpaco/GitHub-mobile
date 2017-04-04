import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { GitHubService } from '../services/github-service';
import { RepoDetailPage } from '../repo-detail/repo-detail';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [GitHubService]
})
export class AboutPage {
  public foundRepos;
  public noRepos;
  username: string = '';

  constructor(public navCtrl: NavController, private github: GitHubService) {

  }

  getRepo() {
    this.github.getRepos(this.username).subscribe(
      data => {
        this.foundRepos = data.json();
        this.noRepos = null;
      },
      err => {
        this.noRepos = 'User not found.';
        this.foundRepos = [];
      },
      () => console.log('getRepos completed')
    )
  }

  goToDetails(repo) {
    this.navCtrl.push(RepoDetailPage, {repo: repo});
  }


}
