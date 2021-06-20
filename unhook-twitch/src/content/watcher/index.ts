import { EventEmitter } from 'events';
import logger from '../utils/logger';

class Watcher extends EventEmitter {
    constructor() {
        super();

        this.setMaxListeners(100);
    }

    setup() {
        logger.info("Setting up the watcher");
        
    }
}

export default Watcher;
