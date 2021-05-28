import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinonChai from 'sinon-chai'
import { SafeEthersSigner, SafeService } from '../src/'
import sinon from 'sinon'
import { BigNumber } from '@ethersproject/bignumber'
import { SafeTransaction } from '@gnosis.pm/safe-core-sdk'
import { OperationType } from '@gnosis.pm/safe-core-sdk/dist/src/utils/transactions/SafeTransaction'
import { getCreateCallDeployment } from '@gnosis.pm/safe-deployments'

chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('SafeEthersSigner', () => {
  describe('sendTransaction', async () => {
    it('should submit contract interaction to sevice', async () => {
      const txData = {
        to: "to_address",
        value: "0x42",
        data: "0xbaddad42"
      }
      const parsedTxData = {
        to: 'to_address',
        data: '0xbaddad42',
        value: '66',
        operation: 0
      }
      const safeTxData = {
        ...parsedTxData,
        safeTxGas: BigNumber.from(1337)
      }
      const safeTx = { data: safeTxData }
      const signature = { signer: "some_signer", data: "some_signature" }
      const safe: any = {
        getAddress: sinon.fake.returns("some_safe_address"),
        getChainId: sinon.fake.returns(1),
        createTransaction: sinon.fake.returns(safeTx),
        getTransactionHash: sinon.fake.returns("some_transaction_hash"),
        signTransactionHash: sinon.fake.returns(signature)
      }
      const service: any = {
        estimateSafeTx: sinon.fake.returns(BigNumber.from(1337)),
        proposeTx: sinon.fake.returns("some_data")
      }
      const signer = new SafeEthersSigner(safe, service)

      // TODO check response
      await signer.sendTransaction(txData)
      chai.expect(service.estimateSafeTx).to.have.been.calledWith(
        "some_safe_address",
        parsedTxData
      )
      chai.expect(service.proposeTx).to.have.been.calledWith(
        "some_safe_address",
        "some_transaction_hash",
        safeTx,
        signature
      )
    })

    it('should submit contract creation to sevice', async () => {
      const createLibAddress = getCreateCallDeployment()
      const txData = {
        value: "0x42",
        data: "0xbaddad42"
      }
      const parsedTxData = {
        to: createLibAddress!!.defaultAddress,
        data: '0x4c8c9ea1000000000000000000000000000000000000000000000000000000000000004200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000004baddad4200000000000000000000000000000000000000000000000000000000',
        value: "0",
        operation: 1
      }
      const safeTxData = {
        ...parsedTxData,
        safeTxGas: BigNumber.from(1337)
      }
      const safeTx = { data: safeTxData }
      const signature = { signer: "some_signer", data: "some_signature" }
      const safe: any = {
        getAddress: sinon.fake.returns("some_safe_address"),
        getChainId: sinon.fake.returns(1),
        createTransaction: sinon.fake.returns(safeTx),
        getTransactionHash: sinon.fake.returns("some_transaction_hash"),
        signTransactionHash: sinon.fake.returns(signature)
      }
      const service: any = {
        estimateSafeTx: sinon.fake.returns(BigNumber.from(1337)),
        proposeTx: sinon.fake.returns("some_data")
      }
      const signer = new SafeEthersSigner(safe, service)

      // TODO check response
      await signer.sendTransaction(txData)
      chai.expect(service.estimateSafeTx).to.have.been.calledWith(
        "some_safe_address",
        parsedTxData
      )
      chai.expect(service.proposeTx).to.have.been.calledWith(
        "some_safe_address",
        "some_transaction_hash",
        safeTx,
        signature
      )
    })
  })
})
