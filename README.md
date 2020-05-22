This extension blocks Notifications when a tab is muted.
It does that by temporarily replacing the native `Notification` class with an empty class when a tab is muted, and storing the original `Notification` class in a temporary variable.
When a tab is unmuted, it re-enables the `Notification` class and deletes the temporary variable.


Simple, light, and sometimes critical for immediate focus.
