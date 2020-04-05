describe('Example', () => {

  it('reload emulator', async()=>{
    // reload device
    await device.reloadReactNative();
  })
  it('input test', async () => {
   // simulation input 
   await element(by.id('inputData')).typeText('testing');
   await expect(element(by.id('inputData'))).toHaveText('testing');
  })
  it('add test', async () => {
    // simulation add data
    await element(by.id('addData')).tap();
    await expect(element(by.id('deleteData1'))).toBeVisible();
  })
  it('delete test', async () => {
    // simulation delete data
    await element(by.id('deleteData1')).multiTap(2);
    await expect(element(by.id('deleteData1'))).toBeNotVisible();
  })
});
