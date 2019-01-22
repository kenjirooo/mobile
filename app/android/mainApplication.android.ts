import { BroadcasterService } from 'jslib/abstractions/broadcaster.service';

import { ServiceContainer } from '../../services/serviceContainer';

@JavaProxy('com.tns.MainApplication')
export class MainApplication extends android.app.Application {
    serviceContainer: ServiceContainer;

    onCreate(): void {
        super.onCreate();

        // At this point modules have already been initialized

        // Enter custom initialization code here
        this.serviceContainer = new ServiceContainer();
        this.serviceContainer.init({ androidAppContext: this.getApplicationContext() });
        this.serviceContainer.bootstrap();

        const broadcasterService = this.serviceContainer.resolve<BroadcasterService>('broadcasterService');
        broadcasterService.subscribe('MainApplication', (message: any) => {
            console.log('Got message in MainApplication');
            console.log(message);
        });
    }

    attachBaseContext(baseContext: android.content.Context) {
        super.attachBaseContext(baseContext);

        // This code enables MultiDex support for the application (if needed)
        // android.support.multidex.MultiDex.install(this);
    }
}
