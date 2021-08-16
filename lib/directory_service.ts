import cdk = require('@aws-cdk/core');
import ds = require('@aws-cdk/aws-directoryservice');
import ec2 = require('@aws-cdk/aws-ec2');
import { VpcProvider } from './vpc';

export class DirectoryMicrosoftAdCore extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const vpc = ec2.Vpc.fromLookup(this, 'ExistingVPC', { vpcName: 'vpcSample/Vpc' }); 

        const ad = new ds.CfnMicrosoftAD(this, 'IdentityMicroftAD', {
            name: 'shazi.info',
            edition: 'Standard',
            password: '1qaz@WSX3edc$RFV',
            vpcSettings : {
                subnetIds : vpc.selectSubnets({
                    subnetType: ec2.SubnetType.PRIVATE,
                    // require select two subnet
                    availabilityZones: ['us-east-1a', 'us-east-1b']
                }).subnetIds,
                vpcId : vpc.vpcId
            },
            // if you enable with SSO 
            createAlias: true,
            enableSso: true
        });
    }
}

// export class DirectoryProvider extends cdk.Stack {
//     public static createMicrosoftAd(scope: cdk.Construct) {
//         const stack = cdk.Stack.of(scope)

//         const vpc = VpcProvider.createSimple(stack);

//         const directoryService = new ds.CfnMicrosoftAD(stack, 'IdentityMicroftAD', {
//                         name: 'scottliao.com',
//                         edition: 'Standard',
//                         password: '1qaz@WSX3edc$RFV',
//                         vpcSettings : {
//                             subnetIds : vpc.selectSubnets({
//                                 subnetType: ec2.SubnetType.PRIVATE,
//                                 // require select two subnet
//                                 availabilityZones: ['us-east-1a', 'us-east-1c']
//                             }).subnetIds,
//                             vpcId : vpc.vpcId
//                         },
//                         // if you enable with SSO 
//                         createAlias: true,
//                         enableSso: true
//                     });

//         cdk.Tag.add(vpc.stack, 'cdk-stack', 'VpcProvider');

//     return directoryService
//     }
// }