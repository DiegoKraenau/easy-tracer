
# Easy Tracer

A library to trace requests and responses functions in Nestjs. The main advantage to this library is to debug between request and response logs inside some environment or local machine. It is useful to trace data flows in microservices or monolithic.



## Install

Run the following command

```bash
  npm i easy-tracer
```

## Setup Module
First of all, you will need setup the module.

```
import { EasyTracerModule } from 'easy-tracer';

@Module({
  imports: [
    ...
    EasyTracerModule.forRoot({
      showLogs: true,
    }),
  ],
  controllers: [...],
  providers: [...],
})
export class AppModule {};
```

| - | Description |
| --- | --- |
| showLogs | Boolean to enable or disable logs in root. |


## Trace a Controller
Trace decorator mainly works in controller to trace the request and response function.

```
import { Trace } from 'easy-tracer';

@Controller('...')
export class TestController {
  constructor(...) {}

  @Get('...')
  @Trace()
  async test(...) {
    return ...;
  }

```

## Methods
The followins methos are:

```
    * @Trace(): Enable trace.
    * @Trace({ showLogs: false }): Disable trace.
```

## Output
When trace is enable, you will find two logs in your console about the request and response function.
| Formats | Example |
| --- | --- |
| Request | Request - functionName - MM/DD/YYYY HH:mm:ss -> [Params] |
| Response | Response - functionName - MM/DD/YYYY HH:mm:ss -> [Response] |

Here the example:

```
//Example function
@Post()
@Trace()
async addEvent(@Body() dto: RegisterEvent) {
  await this.eventService.addEvent(dto);
  return { message: 'Event was added' };
}

//Tracing the function in console
[Nest] 24360  - 24/05/2023, 11:29:55 p. m. VERBOSE Request - addEvent - 05/24/2023 23:29:55 -> [{"priority":"HIGH","sent":false}]
[Nest] 24360  - 24/05/2023, 11:29:55 p. m. VERBOSE Response - addEvent - 05/24/2023 23:29:55 -> {"message":"Event was added"}

```