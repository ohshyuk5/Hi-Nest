import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import { PythonShell } from 'python-shell';

@Injectable()
export class InferenceService {
  async test(): Promise<string> {
    this.testSync();
    this.testAsync();
    return 'All processes running';
  }

  async testSync(): Promise<string> {
    const options = {
      scriptPath: 'src/inference/python-scripts/',
      args: [
        JSON.stringify({ result: 'result' }),
        JSON.stringify({ input: 'input' }),
      ],
    };
    const data = await this.promRunScript('script-sync.py', options);
    return data[0];
  }

  testAsync(): Promise<string> {
    const options = {
      scriptPath: 'src/inference/python-scripts/',
      args: [
        JSON.stringify({ result: 'result' }),
        JSON.stringify({ input: 'input' }),
      ],
    };
    const data = this.promRunScript('script-async.py', options);
    return data[0];
  }

  promRunScript(filename: string, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      PythonShell.run(filename, options, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(data);
        resolve(data);
      });
    });
  }
}
