## Custom Controls

As mentioned above ngrx-forms re-uses the `ControlValueAccessor` concept of `@angular/forms`. ngrx-forms ships its own variants of all default value accessors (most of which simply inherit the implementation from `@angular/forms`. Most libraries providing custom value accessors should also work with ngrx-forms out of the box as long as they properly export the value accessor. However, in case a library does not do this you may have to write your own value accessor. See the example app for such a custom value accessor (in this case for the `md-select` from `@angular/material` which in version `2.0.0-beta.8` does not properly export the `md-select`'s value accessor).