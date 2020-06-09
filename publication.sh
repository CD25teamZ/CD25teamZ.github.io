#!/bin/bash
tag="3.0"
temp="./docs"

ls -1 |grep -v $(basename $0)|xargs rm -rf
git clone https://github.com/CD25teamZ/web.git -b $tag --depth 1 $temp --recursive
find $temp \( -name *git* -o -name *.ps1 \) |xargs rm -rf
ls -1dA $temp/articles/*|grep -v draft|xargs rm -rf
mv $temp/* .
rm -rf $temp