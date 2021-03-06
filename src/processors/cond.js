/**
 * If condition processor.
 * @param {Component|null} parent Parent component
 * @param {Element} node Container node
 * @param {Object} child Reference to this component
 * @param {Class<Component>} template Component class for insert, if test true
 * @param {boolean} test Condition test
 * @param {Component} owner Owner of inserting component
 * @return {boolean} test result
 */
export default function cond( parent, node, child/*.ref*/, template, test, owner ) {
    if ( child.ref ) { // If view was already inserted, update or remove it.
        if ( !test ) {
            child.ref.remove();
        }
    } else if ( test ) {

        // Render new view.
        const view = new template( {
            parent,
            owner,
            filters: parent.filters,
            directives: parent.directives,
            container: node
        } );
        view.render();

        // Set view hierarchy.
        parent.nested.push( view );

        // Remember to remove child ref on remove of view.
        child.ref = view;
        view.unbind = function() {
            child.ref = null;
        };

        // Call hook
        view.didMount();
    }
    return test;
}
