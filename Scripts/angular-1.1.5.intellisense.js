function Empty() {

}

intellisense.annotate(angular, {
    'module': function () {
        /// <signature>
        ///   <summary>A global place for creating and registering Angular modules. All modules (angular core or 3rd party) that should be available to an application must be registered using this mechanism.</summary>
        ///   <param name="name" type="String">The name of the module to create or retrieve.</param>
        ///   <param name="requires" type="Array">(optional)If specified then new module is being created. If unspecified then the the module is being retrieved for further configuration.</param>
        ///   <param name="configFn" type="Function">(optional)A Configuration function for the module.</param>
        ///   <returns>The result of evaluating the expression.</returns>
        /// </signature>
    },
});

var moduleObj = angular.module;
angular.module = function (name, requires, configFn) {
    var retval = moduleObj(name, requires, configFn);
    intellisense.annotate(retval, {
        'config': function () {
            /// <signature>
            ///   <summary>Register work which needs to be performed on module loading.</summary>
            ///   <param name="configFn" type="Function">Execute this function on module load. Useful for service configuration.</param>
            /// </signature>
        },
        'constant': function () {
            /// <signature>
            ///   <summary>Creates a new constant.</summary>
            ///   <param name="name" type="String">The name of the constant to create.</param>
            ///   <param name="object" type="Object">The value of the constant.</param>
            /// </signature>
        },
        'controller': function () {
            /// <signature>
            ///   <summary>Creates a new controller.</summary>
            ///   <param name="name" type="String">The name of the controller to create.</param>
            ///   <param name="constructor" type="Function">The controller constructor function.</param>
            /// </signature>
        },
        'directive': function () {
            /// <signature>
            ///   <summary>Creates a new directive.</summary>
            ///   <param name="name" type="String">The name of the directive to create.</param>
            ///   <param name="constructor" type="Function">The directive constructor function.</param>
            /// </signature>
        },
        'factory': function () {
            /// <signature>
            ///   <summary>Creates a new factory.</summary>
            ///   <param name="name" type="String">The name of the factory to create.</param>
            ///   <param name="providerFunction" type="Function">The factory constructor function.</param>
            /// </signature>
        },
        'filter': function () {
            /// <signature>
            ///   <summary>Creates a new filter.</summary>
            ///   <param name="name" type="String">The name of the filter to create.</param>
            ///   <param name="providerFunction" type="Function">The factory function for creating a new filter.</param>
            /// </signature>
        },
        'provider': function () {
            /// <signature>
            ///   <summary>Creates a new provider.</summary>
            ///   <param name="name" type="String">The name of the provider to create.</param>
            ///   <param name="providerFunction" type="Function">The provider constructor function.</param>
            /// </signature>
        },
        'run': function () {
            /// <signature>
            ///   <summary>Registers work which should be performed when the injector is done loading all modules.</summary>
            ///   <param name="initializationFn" type="Function">Execute this function after injector creation. Useful for application initialization.</param>
            /// </signature>
        },
        'service': function () {
            /// <signature>
            ///   <summary>Creates a new service.</summary>
            ///   <param name="name" type="String">The name of the service to create.</param>
            ///   <param name="constructor" type="Function">The service constructor function.</param>
            /// </signature>
        },
        'constant': function () {
            /// <signature>
            ///   <summary>Creates a new value.</summary>
            ///   <param name="name" type="String">The name of the value to create.</param>
            ///   <param name="object" type="Object">The value of the value.</param>
            /// </signature>
        }
    });

    return retval;
}
intellisense.redirectDefinition(angular.module, moduleObj)

angular.Scope = function () { };
angular.Scope.prototype.$apply = function () { };
angular.Scope.prototype.$broadcast = function () { };
angular.Scope.prototype.$destroy = function () { };
angular.Scope.prototype.$digest = function () { };
angular.Scope.prototype.$emit = function () { };
angular.Scope.prototype.$eval = function () { };
angular.Scope.prototype.$evalAsync = function () { };
angular.Scope.prototype.$new = function () { };
angular.Scope.prototype.$on = function () { };
angular.Scope.prototype.$watch = function () { };
angular.Scope.prototype.$id = 1;

intellisense.annotate(angular.Scope.prototype, {
    '$apply': function () {
        /// <signature>
        ///   <summary>Used to execute an expression in angular from outside of the angular framework.</summary>
        ///   <param name="exp" type="String">An angular expression to be executed.</param>
        ///   <returns>The result of evaluating the expression.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Used to execute an expression in angular from outside of the angular framework.</summary>
        ///   <param name="exp" type="Function">An angular expression to be executed.</param>
        ///   <returns>The result of evaluating the expression.</returns>
        /// </signature>
    },
    '$broadcast': function (name, args) {
        /// <signature>
        ///   <summary>Dispatches an event name downwards to all child scopes (and their children).</summary>
        ///   <param name="name" type="String">Event name to broadcast.</param>
        ///   <param name="args" type="Object">Optional set of arguments which will be passed onto the event listeners.</param>
        ///   <returns type="Object">Event object.</returns>
        /// </signature>
    },
    '$destroy': function () {
        /// <signature>
        ///   <summary>Removes the current scope (and all of its children) from the parent scope.</summary>
        /// </signature>
    },
    '$digest': function () {
        /// <signature>
        ///   <summary>Processes all of the watchers of the current scope and its children.</summary>
        /// </signature>
    },
    '$emit': function (name, args) {
        /// <signature>
        ///   <summary>Dispatches an event name upwards through the scope hierarchy.</summary>
        ///   <param name="name" type="String">Event name to emit.</param>
        ///   <param name="args" type="Object">Optional set of arguments which will be passed onto the event listeners.</param>
        ///   <returns type="Object">Event object.</returns>
        /// </signature>
    },
    '$eval': function () {
        /// <signature>
        ///   <summary>Executes the expression on the current scope returning the result.</summary>
        ///   <param name="expression" type="String">An angular expression to be executed.</param>
        ///   <returns>The result of evaluating the expression.</returns>
        /// </signature>
        /// <signature>
        ///   <summary>Executes the expression on the current scope returning the result.</summary>
        ///   <param name="expression" type="Function">An angular expression to be executed.</param>
        ///   <returns>The result of evaluating the expression.</returns>
        /// </signature>
    },
    '$evalAsync': function () {
        /// <signature>
        ///   <summary>Executes the expression on the current scope at a later point in time.</summary>
        ///   <param name="expression" type="String">An angular expression to be executed.</param>
        /// </signature>
        /// <signature>
        ///   <summary>Executes the expression on the current scope at a later point in time.</summary>
        ///   <param name="expression" type="Function">An angular expression to be executed.</param>
        /// </signature>
    },
    '$new': function (isolate) {
        /// <signature>
        ///   <summary>Creates a new child scope.</summary>
        ///   <param name="isolate" type="boolean">if true then the scope does not prototypically inherit from the parent scope. </param>
        ///   <returns type="Object">The newly created child scope.</returns>
        /// </signature>
    },
    '$on': function (name, listener) {
        /// <signature>
        ///     <summary>
        ///     Listens on events of a given type.
        ///     <para>The event listener function format is: function(event, args...). The event object passed into the listener has the following attributes:</para>
        ///         <para>- targetScope - {Scope}: the scope on which the event was $emit-ed or $broadcast-ed.</para>
        ///         <para>- currentScope - {Scope}: the current scope which is handling the event.</para>
        ///         <para>- name - {string}: Name of the event.</para>
        ///         <para>- stopPropagation - {function}: calling stopPropagation function will cancel further event propagation (available only for events that were $emit-ed).</para>
        ///         <para>- preventDefault - {function}: calling preventDefault sets defaultPrevented flag to true.</para>
        ///         <para>- defaultPrevented - {boolean}: true if preventDefault was called.</para>
        ///     </summary>
        ///   <param name="name" type="String">Event name to listen on.</param>
        ///   <param name="listener" type="Function">Function to call when the event is emitted.</param>
        ///   <returns type="Function">Returns a deregistration function for this listener.</returns>
        /// </signature>
    },
    '$watch': function (watchExpression, listener, objectEquality) {
        /// <signature>
        ///     <summary>Registers a listener callback to be executed whenever the watchExpression changes.</summary>
        ///   <param name="watchExpression" type="Function|String">Expression that is evaluated on each $digest cycle.</param>
        ///   <param name="listener" type="Function|String">Callback called whenever the return value of the watchExpression changes.</param>
        ///   <param name="objectEquality" type="boolean">Compare object for equality rather than for reference.</param>
        ///   <returns type="Function">Returns a deregistration function for this listener.</returns>
        /// </signature>
    },
});

angular.RouteProvider = function () { };
angular.RouteProvider.prototype.otherwise = function () { };
angular.RouteProvider.prototype.when = function () { };

intellisense.annotate(angular.RouteProvider.prototype, {
    'otherwise': function () {
        /// <signature>
        ///   <summary>Sets route definition that will be used on route change when no other route definition is matched.</summary>
        ///   <param name="params" type="Object">Mapping information to be assigned to $route.current.</param>
        ///   <returns>Self.</returns>
        /// </signature>
    },
    'when': function () {
        /// <signature>
        ///   <summary>Adds a new route definition to the $route service.</summary>
        ///   <param name="path" type="String">Route path (matched against $location.path).</param>
        ///   <param name="route" type="Object">Mapping information to be assigned to $route.current on route match.</param>
        ///   <returns>Self.</returns>
        /// </signature>
    }
});
