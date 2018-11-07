import { renderWidget, expectRenderedHTML } from '../helpers';

/**
 * Widget for
 * <h1>{{ title }}</h1>
 * <div>
 *   {{ content }}
 * </div>
 * @class
 */
function CustomPanel() {
    __UI__.Widget.apply( this, arguments );
    this.__data__ = {};

    // Create elements
    var h10 = document.createElement( 'h1' );
    var text1 = document.createTextNode( '' );
    var div2 = document.createElement( 'div' );
    var text3 = document.createTextNode( '' );

    // Construct dom
    h10.appendChild( text1 );
    div2.appendChild( text3 );

    // Update functions
    this.__update__ = {
        title: function( title ) {
            text1.textContent = title;
        },
        content: function( content ) {
            text3.textContent = content;
        }
    };

    // Set root nodes
    this.nodes = [ h10, div2 ];
}
CustomPanel.prototype = Object.create( __UI__.Widget.prototype );
CustomPanel.prototype.constructor = CustomPanel;
CustomPanel.prototype.name = 'CustomPanel';
CustomPanel.prototype.update = function( __currentData__ ) {
    var __data__ = Object.assign( {}, this.options, __currentData__ );
    if ( __data__.title !== undefined ) {
        this.__update__.title( __data__.title );
    }
    if ( __data__.content !== undefined ) {
        this.__update__.content( __data__.content );
    }
    this.options = __data__;
};


/**
 * Widget for <CustomPanel title="string" content="text"/>
 * @class
 */
function custom() {
    __UI__.Widget.apply( this, arguments );
    this.__data__ = {};
    var _this = this;

    // Create elements
    var custom0 = document.createComment( 'CustomPanel' );
    var child0 = {};

    // Extra render actions
    this.onRender = function() {
        __UI__.insert( _this,
            custom0,
            child0,
            CustomPanel,
            { 'title': 'string', 'content': 'text' } );
    };

    // Set root nodes
    this.nodes = [ custom0 ];
}
custom.prototype = Object.create( __UI__.Widget.prototype );
custom.prototype.constructor = custom;
custom.prototype.name = 'custom';
custom.prototype.update = function( __currentData__ ) {
    var __data__ = Object.assign( {}, this.options, __currentData__ );
    this.options = __data__;
};


it( 'render', async() => {
    expect.assertions( 1 );
    await renderWidget( custom );
    expectRenderedHTML( '<h1>string</h1><div>text</div><!--CustomPanel-->' );
} );
