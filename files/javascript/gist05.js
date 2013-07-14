YUI().use("node", function(Y) {
    function build_replacement_object(node, o) {
        node.setContent(node.getContent(), o);
    }
    
    build_replacement_object(Y.one("#id_test"), {
        name : "Matt Snider",
        activity : "Video Games",
        sport : "Soccer"
    });
});