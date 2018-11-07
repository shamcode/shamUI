import { renderWidget, expectRenderedHTML } from '../helpers';
import { DI } from '../../src/shamUI';

/**
 * Widget for
 * <ul>
 *   {% for key, value of list %}
 *     <li>{{ key }}:{{ value }}</li>
 *   {% endfor %}
 * </ul>
 * @class
 */
function loop() {
    __UI__.Widget.apply( this, arguments );
    this.__data__ = {};
    var _this = this;

    // Create elements
    var ul0 = document.createElement( 'ul' );
    var children0 = new __UI__.Map();

    // Update functions
    this.__update__ = {
        list: function( list ) {
            __UI__.loop( _this,
                ul0,
                children0,
                loop_for0,
                list,
                { 'key': 'key', 'value': 'value' } );
        }
    };

    // On update actions
    this.onUpdate = function( __data__ ) {
        children0.forEach( function( view ) {
            view.update( view.__state__ );
            view.update( __data__ );
            view.update( view.__state__ );
        } );
    };

    // Set root nodes
    this.nodes = [ ul0 ];
}
loop.prototype = Object.create( __UI__.Widget.prototype );
loop.prototype.constructor = loop;
loop.prototype.name = 'loop';
loop.prototype.update = function( __currentData__ ) {
    var __data__ = Object.assign( {}, this.options, __currentData__ );
    if ( __data__.list !== undefined ) {
        this.__update__.list( __data__.list );
    }
    this.onUpdate( __data__ );
    this.options = __data__;
};

/**
 * @class
 */
// eslint-disable-next-line camelcase
function loop_for0() {
    __UI__.Widget.apply( this, arguments );
    this.__data__ = {};
    this.__state__ = {};

    // Create elements
    var li0 = document.createElement( 'li' );
    var text1 = document.createTextNode( '' );
    var text2 = document.createTextNode( '' );

    // Construct dom
    li0.appendChild( text1 );
    li0.appendChild( document.createTextNode( ':' ) );
    li0.appendChild( text2 );

    // Update functions
    this.__update__ = {
        key: function( key ) {
            text1.textContent = key;
        },
        value: function( value ) {
            text2.textContent = value;
        }
    };

    // Set root nodes
    this.nodes = [ li0 ];
}
loop_for0.prototype = Object.create( __UI__.Widget.prototype );
// eslint-disable-next-line camelcase
loop_for0.prototype.constructor = loop_for0;
loop_for0.prototype.name = 'loop_for0';
loop_for0.prototype.update = function( __currentData__ ) {
    var __data__ = Object.assign( {}, this.options, __currentData__ );
    if ( __data__.key !== undefined && __data__.__index__ !== undefined ) {
        this.__update__.key( __data__.key );
    }
    if ( __data__.value !== undefined && __data__.__index__ !== undefined ) {
        this.__update__.value( __data__.value );
    }
    this.options = __data__;
};


it( 'render (array)', async() => {
    expect.assertions( 1 );
    await renderWidget( loop, {
        list: [ 'one', 'two', 'three' ]
    } );
    expectRenderedHTML( '<ul><li>0:one</li><li>1:two</li><li>2:three</li></ul>' );
} );

it( 'render (object)', async() => {
    expect.assertions( 1 );
    await renderWidget( loop, {
        list: {
            one: 'I',
            two: 'II',
            three: 'III'
        }
    } );
    expectRenderedHTML( '<ul><li>one:I</li><li>two:II</li><li>three:III</li></ul>' );
} );

it( 'update', async() => {
    expect.assertions( 5 );
    const list = [ 'one', 'two', 'three' ];
    await renderWidget( loop, {
        list,
        ID: 'loop'
    } );
    expectRenderedHTML( '<ul><li>0:one</li><li>1:two</li><li>2:three</li></ul>' );
    const widget = DI.resolve( 'sham-ui:store' ).findById( 'loop' );
    widget.update( { list: [ ...list, 'four' ] } );
    expectRenderedHTML( '<ul><li>0:one</li><li>1:two</li><li>2:three</li><li>3:four</li></ul>' );
    widget.update( { list: [ 'one', 'two' ] } );
    expectRenderedHTML( '<ul><li>0:one</li><li>1:two</li></ul>' );
    widget.update( { list: [ ...list ] } );
    expectRenderedHTML( '<ul><li>0:one</li><li>1:two</li><li>2:three</li></ul>' );
    widget.update( { list: [ 'one', 'three' ] } );
    expectRenderedHTML( '<ul><li>0:one</li><li>1:three</li></ul>' );
} );