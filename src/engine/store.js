import DI from '../DI';

/**
 * @property {Map<String, Component>} byId
 * @property {Set<Component>} changedComponents
 * @property {Array<String>} renderedIds
 */
export default class Store {
    constructor() {
        DI.bind( 'sham-ui:store', this );
        this.clear();
    }

    /**
     * @param {Component} component
     */
    registry( component ) {
        this.byId.set( component.ID, component );
    }

    /**
     * @param {Component} component
     */
    unregister( component ) {
        this.byId.delete( component.ID );
    }

    /**
     * @param {String} componentId
     * @return {Component}
     */
    findById( componentId ) {
        return this.byId.get( componentId );
    }

    /**
     * @param {Function} callback
     * @return {Component}
     */
    find( callback ) {
        for ( let component of this.byId.values() ) {
            if ( callback( component ) ) {
                return component;
            }
        }
        return null;
    }

    /**
     * @param {Function} callback
     * @return {Array.<Component>}
     */
    filter( callback ) {
        return Array.from( this.byId.values() ).filter( callback );
    }

    /**
     * @param {Function} callback
     */
    forEach( callback ) {
        this.byId.forEach( callback );
    }

    /**
     * @param {Array<String>} ids
     * @param {Function} callback
     */
    forEachId( ids, callback ) {
        ids.forEach( id => {
            if ( this.byId.has( id ) ) {
                callback( this.byId.get( id ) );
            }
        } );
    }

    /**
     * @param {Function} callback
     * @return {Array}
     */
    map( callback ) {
        return Array.from( this.byId.values() ).map( callback );
    }

    clear() {
        this.byId = new Map();
        this.changedComponents = new Set();
        this.renderedIds = [];
    }
}

