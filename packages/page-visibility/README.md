# `page-visibility`

> 检查页面是否可见的工具

## Usage

```
import pv from '@geeeger/page-visibility';

describe('@geeeger/page-visibility module', () => {
  beforeEach(() => {
    pv.init();
  });
  afterEach(() => {
    pv.destory();
  });

  test('should get value', () => {
    expect(pv.getState()).toBeTruthy();
    expect(typeof pv.isHidden() === 'boolean').toBeTruthy();
  });

  test('test event change', () => {
    expect.assertions(1);
    pv.addListener((isHidden: any) => {
      pv.removeListeners();
      expect(isHidden !== undefined).toBe(true);
    });
    const event = document.createEvent('CustomEvent');
    event.initEvent('visibilitychange', true, true);
    document.dispatchEvent(event);
  });

  test('test remove listener', () => {
    expect.assertions(1);
    const ls = function ls(isHidden: any) {
      expect(isHidden !== undefined).toBe(true);
    };
    const ls1 = function ls1(isHidden: any) {
      expect(isHidden !== undefined).toBe(true);
    };
    pv.addListener(ls);
    pv.addListener(ls1);
    pv.removeListener(ls);
    const event = document.createEvent('CustomEvent');
    event.initEvent('visibilitychange', true, true);
    document.dispatchEvent(event);
  });

  test('test once', async () => {
    setTimeout(() => {
      const event = document.createEvent('CustomEvent');
      event.initEvent('visibilitychange', true, true);
      document.dispatchEvent(event);
    }, 500);
    await expect(pv.once()).resolves.toBeTruthy();
  });
});
```
