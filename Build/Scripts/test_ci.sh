#!/usr/bin/env bash

# -e break script on errors
# -xv show debug information
set -exv

echo "Run test suite for SITE extension:"

THIS_SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
cd "$THIS_SCRIPT_DIR" || exit 1

ROOT_DIR=`readlink -f ${PWD}/../../`

cd ${ROOT_DIR} || exit 1

echo "Run composerInstall..."
/bin/sh -c "
        composer install --no-progress --no-interaction;
      "

echo "Run composerValidate..."
/bin/sh -c "
        composer validate;
      "

echo "Run php lint..."
/bin/sh -c "
        find . -name \\*.php ! -path "./.Build/\\*" -print0 | xargs -0 -n1 -P4 php -dxdebug.mode=off -l >/dev/null
      "

echo "Run unit tests..."
EXTRA_TEST_OPTIONS=""
TEST_FILE="Web/typo3conf/ext/site/Tests/Unit"
cd ${ROOT_DIR}/.Build
/bin/sh -c "
        bin/phpunit -c vendor/typo3/testing-framework/Resources/Core/Build/UnitTests.xml ${EXTRA_TEST_OPTIONS} ${TEST_FILE};
      "

echo "Run functional test against mysql..."
export typo3DatabaseName="pipelines"
export typo3DatabaseUsername="root"
export typo3DatabasePassword="let_me_in"
export typo3DatabaseHost="127.0.0.1"
TEST_FILE="Web/typo3conf/ext/site/Tests/Functional"
/bin/sh -c "
        bin/phpunit -c vendor/typo3/testing-framework/Resources/Core/Build/FunctionalTests.xml ${EXTRA_TEST_OPTIONS} ${TEST_FILE};
      "
