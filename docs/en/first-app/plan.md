# Plan

In this section of the guide, we are going to build an app while explaining every part of the process.

The app in question is going to be a tiny system hardware monitor!

The hardware information are going to be gathered using [`hardware`](https://github.com/crystal-community/hardware), which will create a fiber that updates the relevant fields in an infinite loop.

A Notebook widget will be used with 3 tabs for CPU, Memory & Network. Each page will use a Grid widget to display the info as well as change the title based on the current page's. There will also be a popover with an About app action. Additionally custom icons and CSS are going to be used.

This section of the guide assumes you've read and followed the [Structure](../structure/template) section.
