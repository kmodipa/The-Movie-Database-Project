import { MoviesServiceService } from './MoviesService/movies-service.service';
import {AccountsServiceService} from './AccountsService/accounts-service.service';
import {ToasterNotificationServiceService} from './ToasterNotificationService/toaster-notification-service.service';
import {SearchServiceService} from './SearchService/search-service.service';

const ServicesImports = [
    MoviesServiceService,
    AccountsServiceService,
    ToasterNotificationServiceService,
    SearchServiceService
];

export {ServicesImports};
