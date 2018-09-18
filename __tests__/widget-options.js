import { Widget, options } from '../src/shamUI';
import { renderWidget, expectRenderedText } from './helpers';

class Label extends Widget {
    @options
    text() {
        return this.ID;
    }
    render() {
        let text = this.options.text;
        if ( 'function' === typeof text ) {
            text = text.call( this );
        }
        this.container.textContent = text;
    }
}

class OverrideDefaultOptions extends Label {
    @options
    text() {
        return 'override';
    }
}

it( 'override default options', async() => {
    expect.assertions( 1 );
    await renderWidget( OverrideDefaultOptions );
    expectRenderedText( 'override' );
} );

it( 'override widget options in params', async() => {
    expect.assertions( 1 );
    await renderWidget( OverrideDefaultOptions, {
        text() {
            return 'override-from-constructor-args';
        }
    } );
    expectRenderedText( 'override-from-constructor-args' );
} );


it( 'extend widget without override options', async() => {
    expect.assertions( 1 );
    class ExtendWithoutOverride extends Label {}
    await renderWidget( ExtendWithoutOverride );
    expectRenderedText( 'dummy' );
} );


it( 'extend widget (two level)', async() => {
    expect.assertions( 1 );
    class ExtendTwoLevel extends OverrideDefaultOptions {
        @options
        text() {
            return 'two level';
        }
    }
    await renderWidget( ExtendTwoLevel );
    expectRenderedText( 'two level' );
} );

it( 'call super (two level)', async() => {
    expect.assertions( 1 );
    class ExtendTwoLevel extends OverrideDefaultOptions {
        @options
        text() {
            return super.text() + ' and extend';
        }
    }
    await renderWidget( ExtendTwoLevel );
    expectRenderedText( 'override and extend' );
} );

it( 'throw error on static', async() => {
    expect.assertions( 1 );
    try {
        class ThrowError extends Widget {
            @options
            static text() {
                return 'text';
            }
        }
        await renderWidget( ThrowError );
    } catch ( e ) {
        expect( e.message ).toEqual(
            expect.stringContaining( 'static options don\'t allow. Name: text, target:' )
        );
    }
} );

it( 'ovveride method with instance prop', async() => {
    expect.assertions( 1 );
    class Dummy extends Label {
        @options text = 'instance text';
    }
    await renderWidget( Dummy );
    expectRenderedText( 'instance text' );
} );
