import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBridgeBank } from 'app/shared/model/bridge-bank.model';
import { Principal } from 'app/core';
import { BridgeBankService } from './bridge-bank.service';

@Component({
    selector: 'jhi-bridge-bank',
    templateUrl: './bridge-bank.component.html'
})
export class BridgeBankComponent implements OnInit, OnDestroy {
    bridgeBanks: IBridgeBank[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bridgeBankService: BridgeBankService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.bridgeBankService.query().subscribe(
            (res: HttpResponse<IBridgeBank[]>) => {
                this.bridgeBanks = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBridgeBanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IBridgeBank) {
        return item.id;
    }

    registerChangeInBridgeBanks() {
        this.eventSubscriber = this.eventManager.subscribe('bridgeBankListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
