
## Optimisation

### proper tail calls (tail call optimisation)
- direct recursion ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/optimisation/proper_tail_calls__tail_call_optimisation_/direct_recursion/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/optimisation/proper_tail_calls__tail_call_optimisation_/direct_recursion/out.js))
- mutual recursion ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/optimisation/proper_tail_calls__tail_call_optimisation_/mutual_recursion/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/optimisation/proper_tail_calls__tail_call_optimisation_/mutual_recursion/out.js))

## Syntax

### default function parameters
- arguments object interaction ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/default_function_parameters/arguments_object_interaction/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/default_function_parameters/arguments_object_interaction/out.js))

### rest parameters
- arguments object interaction ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/rest_parameters/arguments_object_interaction/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/rest_parameters/arguments_object_interaction/out.js))

### spread syntax for iterable objects
- with sparse arrays, in array literals ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/spread_syntax_for_iterable_objects/with_sparse_arrays%2C_in_array_literals/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/spread_syntax_for_iterable_objects/with_sparse_arrays%2C_in_array_literals/out.js))
- spreading non-iterables is a runtime error ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/spread_syntax_for_iterable_objects/spreading_non-iterables_is_a_runtime_error/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/spread_syntax_for_iterable_objects/spreading_non-iterables_is_a_runtime_error/out.js))

### object literal extensions
- computed accessors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/object_literal_extensions/computed_accessors/error.txt))

### for..of loops
- iterator closing, break ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/for..of_loops/iterator_closing%2C_break/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/for..of_loops/iterator_closing%2C_break/out.js)): https://github.com/google/closure-compiler/issues/2958
- iterator closing, throw ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/for..of_loops/iterator_closing%2C_throw/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/for..of_loops/iterator_closing%2C_throw/out.js)): https://github.com/google/closure-compiler/issues/2958

### template literals
- toString conversion ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/template_literals/toString_conversion/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/template_literals/toString_conversion/out.js))
- passed array is frozen ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/template_literals/passed_array_is_frozen/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/template_literals/passed_array_is_frozen/out.js))

### destructuring, declarations
- iterator closing ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/destructuring%2C_declarations/iterator_closing/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/destructuring%2C_declarations/iterator_closing/out.js)): https://github.com/google/closure-compiler/issues/2958

### destructuring, assignment
- iterator closing ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/destructuring%2C_assignment/iterator_closing/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/destructuring%2C_assignment/iterator_closing/out.js)): https://github.com/google/closure-compiler/issues/2958

### destructuring, parameters
- iterator closing ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/destructuring%2C_parameters/iterator_closing/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/destructuring%2C_parameters/iterator_closing/out.js)): https://github.com/google/closure-compiler/issues/2958

### Unicode code point escapes
- in property key definitions ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/Unicode_code_point_escapes/in_property_key_definitions/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/Unicode_code_point_escapes/in_property_key_definitions/out.js))
- in property key accesses ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/Unicode_code_point_escapes/in_property_key_accesses/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/Unicode_code_point_escapes/in_property_key_accesses/out.js))

### new.target
- in constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/syntax/new.target/in_constructors/error.txt))

## Bindings

### const
- temporal dead zone ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/bindings/const/temporal_dead_zone/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/bindings/const/temporal_dead_zone/out.js))
- temporal dead zone (strict mode) ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/bindings/const/temporal_dead_zone__strict_mode_/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/bindings/const/temporal_dead_zone__strict_mode_/out.js))

### let
- temporal dead zone ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/bindings/let/temporal_dead_zone/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/bindings/let/temporal_dead_zone/out.js))
- temporal dead zone (strict mode) ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/bindings/let/temporal_dead_zone__strict_mode_/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/bindings/let/temporal_dead_zone__strict_mode_/out.js))

## Functions

### arrow functions
- no "prototype" property ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/arrow_functions/no_prototype_property/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/arrow_functions/no_prototype_property/out.js))
- lexical "super" binding in constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/arrow_functions/lexical_super_binding_in_constructors/error.txt))
- lexical "new.target" binding ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/arrow_functions/lexical_new.target_binding/error.txt))

### class
- class name is lexically scoped ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/class_name_is_lexically_scoped/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/class_name_is_lexically_scoped/out.js))
- computed names, temporal dead zone ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/computed_names%2C_temporal_dead_zone/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/computed_names%2C_temporal_dead_zone/out.js))
- methods aren't enumerable ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/methods_arent_enumerable/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/methods_arent_enumerable/out.js))
- implicit strict mode ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/implicit_strict_mode/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/implicit_strict_mode/out.js))
- constructor requires new ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/constructor_requires_new/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/constructor_requires_new/out.js)): https://github.com/google/closure-compiler/issues/2919
- extends null ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/extends_null/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/extends_null/out.js))
- new.target ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/class/new.target/error.txt))

### generators
- can't use "this" with new ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/cant_use_this_with_new/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/cant_use_this_with_new/out.js))
- %GeneratorPrototype% ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/%25GeneratorPrototype%25/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/%25GeneratorPrototype%25/out.js))
- %GeneratorPrototype% prototype chain ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/%25GeneratorPrototype%25_prototype_chain/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/%25GeneratorPrototype%25_prototype_chain/out.js))
- %GeneratorPrototype%.constructor ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/%25GeneratorPrototype%25.constructor/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/%25GeneratorPrototype%25.constructor/out.js))
- yield * on non-iterables is a runtime error ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/yield___on_non-iterables_is_a_runtime_error/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/yield___on_non-iterables_is_a_runtime_error/out.js))
- yield *, iterator closing via throw() ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/yield__%2C_iterator_closing_via_throw__/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/yield__%2C_iterator_closing_via_throw__/out.js))
- shorthand generators can't be constructors ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/functions/generators/shorthand_generators_cant_be_constructors/error.txt))

## Built ins

### Reflect
- Reflect.construct sets new.target meta-property ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/Reflect/Reflect.construct_sets_new.target_meta-property/error.txt))

### Promise
- Promise.prototype isn't an instance ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/Promise/Promise.prototype_isnt_an_instance/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/Promise/Promise.prototype_isnt_an_instance/out.js))

### well-known symbols
- Symbol.isConcatSpreadable, spreadable object with poisoned getter ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/well-known_symbols/Symbol.isConcatSpreadable%2C_spreadable_object_with_poisoned_getter/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/well-known_symbols/Symbol.isConcatSpreadable%2C_spreadable_object_with_poisoned_getter/out.js))
- Symbol.toStringTag affects existing built-ins ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/well-known_symbols/Symbol.toStringTag_affects_existing_built-ins/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/well-known_symbols/Symbol.toStringTag_affects_existing_built-ins/out.js))
- Symbol.toStringTag, new built-ins ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/well-known_symbols/Symbol.toStringTag%2C_new_built-ins/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/well-known_symbols/Symbol.toStringTag%2C_new_built-ins/out.js))
- Symbol.unscopables ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-ins/well-known_symbols/Symbol.unscopables/error.txt))

## Built in extensions

### function "name" property
- function statements ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/function_statements/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/function_statements/out.js))
- function expressions ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/function_expressions/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/function_expressions/out.js))
- bound functions ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/bound_functions/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/bound_functions/out.js))
- variables (function) ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/variables__function_/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/variables__function_/out.js))
- object methods (function) ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/object_methods__function_/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/object_methods__function_/out.js))
- shorthand methods ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/shorthand_methods/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/shorthand_methods/out.js))
- symbol-keyed methods ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/symbol-keyed_methods/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/symbol-keyed_methods/out.js))
- class statements ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/class_statements/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/class_statements/out.js))
- class expressions ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/class_expressions/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/class_expressions/out.js))
- variables (class) ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/variables__class_/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/variables__class_/out.js))
- object methods (class) ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/object_methods__class_/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/object_methods__class_/out.js))
- class prototype methods ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/class_prototype_methods/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/class_prototype_methods/out.js))
- class static methods ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/class_static_methods/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/built-in_extensions/function_name_property/class_static_methods/out.js))

## Misc

### prototype of bound functions
- subclasses ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/misc/prototype_of_bound_functions/subclasses/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/misc/prototype_of_bound_functions/subclasses/out.js))

### Updated identifier syntax
- var ⸯ; ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/misc/Updated_identifier_syntax/var_U%2B2E2F_/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/misc/Updated_identifier_syntax/var_U%2B2E2F_/out.js))
- var 𐋀; ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/misc/Updated_identifier_syntax/var_U%2B102C0_/error.txt))

### miscellaneous
- duplicate property names in strict mode ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/misc/miscellaneous/duplicate_property_names_in_strict_mode/error.txt))

## Annex b

### non-strict function semantics
- hoisted block-level function declaration ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/non-strict_function_semantics/hoisted_block-level_function_declaration/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/non-strict_function_semantics/hoisted_block-level_function_declaration/out.js))
- labeled function statements ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/non-strict_function_semantics/labeled_function_statements/error.txt))
- function statements in if-statement clauses ([compile error](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/non-strict_function_semantics/function_statements_in_if-statement_clauses/error.txt))

### __proto__ in object literals
- basic support ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/basic_support/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/basic_support/out.js))
- multiple __proto__ is an error ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/multiple___proto___is_an_error/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/multiple___proto___is_an_error/out.js))
- not a computed property ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/not_a_computed_property/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/not_a_computed_property/out.js))
- not a shorthand property ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/not_a_shorthand_property/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/not_a_shorthand_property/out.js))
- not a shorthand method ([in](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/not_a_shorthand_method/in.js)/[out](https://github.com/teppeis/closure-compiler-es6-compat-table/blob/master/es6/v20220905/annex_b/__proto___in_object_literals/not_a_shorthand_method/out.js))